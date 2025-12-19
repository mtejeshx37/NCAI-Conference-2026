import { useState, useRef } from 'react';
import { X, ChevronRight, ChevronLeft, FileText, Upload as UploadIcon, Eye, User, Plus, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
const logo = "/logo.png";


declare global {
  interface Window {
    Razorpay: any;
  }
}

interface SubmitPaperPageProps {
  onClose: () => void;
}

export function SubmitPaperPage({ onClose }: SubmitPaperPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [paperTitle, setPaperTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [checklist, setChecklist] = useState({
    original: false
  });

  const [primaryAuthor, setPrimaryAuthor] = useState({ name: '', email: '' });
  const [coAuthors, setCoAuthors] = useState<{ name: string; email: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handlePayment = async () => {
    try {
      setIsSubmitting(true);

      // 1. Initiate Registration (Get Order ID)
      const initiateResponse = await fetch('http://localhost:5001/payment/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 500000, // 5000 INR in paise
          receipt: 'rcpt_' + Date.now(),
          notes: {
            paperTitle: paperTitle,
            track: selectedTrack
          },
          email: primaryAuthor.email
        })
      });

      if (!initiateResponse.ok) throw new Error('Failed to initiate payment');

      const responseData = await initiateResponse.json();
      const orderData = responseData.order;

      // 2. Open Razorpay Checkout
      const options = {
        key: responseData.keyId || import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_placeholder", // Ideally from env or response
        amount: orderData.amount,
        currency: orderData.currency,
        name: "NCAI 2026",
        description: "Paper Submission Registration",
        order_id: orderData.order_id,
        handler: async function (response: any) {
          try {
            // 3. Complete Registration (Verify & Upload)
            const formData = new FormData();
            formData.append('razorpay_payment_id', response.razorpay_payment_id);
            formData.append('razorpay_order_id', response.razorpay_order_id);
            formData.append('razorpay_signature', response.razorpay_signature);

            // Add other details required by backend
            formData.append('email', primaryAuthor.email);
            formData.append('name', primaryAuthor.name);
            formData.append('paperTitle', paperTitle);

            if (uploadedFile) {
              formData.append('manuscript', uploadedFile);
            }

            const completeResponse = await fetch('http://localhost:5001/payment/complete', {
              method: 'POST',
              body: formData
            });

            const completeData = await completeResponse.json();

            if (completeData.success) {
              alert('Registration Successful! Check your email for confirmation.');
              onClose();
            } else {
              alert('Registration failed: ' + completeData.message);
            }
          } catch (error) {
            console.error('Completion error:', error);
            alert('An error occurred during finalization. Please contact support.');
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: primaryAuthor.name,
          email: primaryAuthor.email,
        },
        theme: {
          color: "#2563eb"
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          }
        }
      };

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please check your internet connection.");
      }

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error: any) {
      console.error('Payment initiation error:', error);
      alert(`Failed to start payment process: ${error.message || "Unknown error"}`);
      setIsSubmitting(false);
    }
  };

  const addCoAuthor = () => {
    setCoAuthors([...coAuthors, { name: '', email: '' }]);
  };

  const removeCoAuthor = (index: number) => {
    setCoAuthors(coAuthors.filter((_, i) => i !== index));
  };

  const updateCoAuthor = (index: number, field: 'name' | 'email', value: string) => {
    const newCoAuthors = [...coAuthors];
    newCoAuthors[index][field] = value;
    setCoAuthors(newCoAuthors);
  };

  const tracks = [
    'Machine Learning & Deep Learning',
    'Natural Language Processing',
    'Computer Vision & Image Processing',
    'AI for Social Good & Applications',
    'Trustworthy & Responsible AI',
    'Emerging AI Topics',
    'Other'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size exceeds 5MB limit. Please upload a smaller file.');
        e.target.value = ''; // Reset input
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Check file size (5MB = 5 * 1024 * 1024 bytes)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size exceeds 5MB limit. Please upload a smaller file.');
        return;
      }
      setUploadedFile(file);
    }
  };

  const steps = [
    { number: 1, label: 'Details', icon: FileText },
    { number: 2, label: 'Upload', icon: UploadIcon },
    { number: 3, label: 'Review', icon: Eye }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[95vh] sm:max-h-[90vh]">

        {/* FIXED HEADER - Always Visible */}
        <div className="flex-shrink-0 border-b border-gray-200 bg-white rounded-t-xl sm:rounded-t-2xl sticky top-0 z-10">
          {/* Top Bar with Logo and Close Button */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img src={logo} alt="CIT Logo" className="h-10 sm:h-12 flex-shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent text-base sm:text-lg font-bold tracking-wide whitespace-nowrap">
                    NCAI 2026
                  </span>
                  <span className="text-gray-300 hidden sm:inline">•</span>
                  <span className="text-xs sm:text-sm text-gray-500">Paper Submission</span>
                </div>
                <h2 className="text-gray-900 text-base sm:text-lg hidden sm:block">Submit Your Research Paper</h2>
              </div>
            </div>

            {/* Close Button - Always Visible */}
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 sm:p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Close submission form"
              tabIndex={0}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Steps Progress Indicator */}
          <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-5">
            <div className="flex items-center justify-between relative max-w-xl mx-auto">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
              <div
                className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;

                return (
                  <div key={step.number} className="flex flex-col items-center flex-1 relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 transition-all ${isCompleted
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                        : isActive
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg ring-4 ring-blue-100'
                          : 'bg-white border-2 border-gray-300 text-gray-400'
                        }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <p className={`text-xs sm:text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

            {/* Important Notice Banner */}
            <div className="mb-6 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-900 mb-1 sm:mb-2 flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">Important Notice</span>
                    <span className="text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">Required Reading</span>
                  </h4>
                  <p className="text-red-800 text-sm leading-relaxed">
                    Uploading your paper does NOT constitute acceptance or registration. After submission,
                    you must complete the <strong>registration and payment process</strong> for your paper to be
                    considered for review. Papers without payment will not be processed.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Content - Step Based */}
            <div className="max-w-2xl mx-auto">

              {/* STEP 1: Paper Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-gray-900 mb-2">Paper Details</h3>
                    <p className="text-sm text-gray-600">
                      Provide information about your research paper
                    </p>
                  </div>

                  {/* Research Track */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm">
                    <label className="flex items-center gap-2 text-gray-900 mb-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Research Track</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedTrack}
                      onChange={(e) => setSelectedTrack(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      aria-label="Select research track"
                    >
                      <option value="">Select a track...</option>
                      {tracks.map((track) => (
                        <option key={track} value={track}>
                          {track}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Paper Information */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm">
                    <h4 className="flex items-center gap-2 text-gray-900 mb-4">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Paper Information</span>
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="paper-title" className="text-gray-700 text-sm font-medium block mb-2">
                          Paper Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="paper-title"
                          type="text"
                          value={paperTitle}
                          onChange={(e) => setPaperTitle(e.target.value)}
                          placeholder="Enter the full title of your paper"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          aria-required="true"
                        />
                      </div>

                      <div>
                        <label htmlFor="abstract" className="text-gray-700 text-sm font-medium block mb-2">
                          Abstract <span className="text-red-500">*</span>
                          <span className="text-gray-500 font-normal ml-2">(Max 300 words)</span>
                        </label>
                        <textarea
                          id="abstract"
                          value={abstract}
                          onChange={(e) => setAbstract(e.target.value)}
                          placeholder="Provide a brief summary of your research, methodology, and key findings"
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                          aria-required="true"
                        />
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-gray-500">
                            {abstract.split(' ').filter(w => w).length} / 300 words
                          </p>
                          {abstract.split(' ').filter(w => w).length > 300 && (
                            <p className="text-xs text-red-600">Exceeds word limit</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="keywords" className="text-gray-700 text-sm font-medium block mb-2">
                          Keywords <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="keywords"
                          type="text"
                          value={keywords}
                          onChange={(e) => setKeywords(e.target.value)}
                          placeholder="machine learning, neural networks, deep learning"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          aria-required="true"
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                      </div>
                    </div>
                  </div>

                  {/* Primary Author */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm">
                    <h4 className="flex items-center gap-2 text-gray-900 mb-4">
                      <User className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Primary Author</span>
                    </h4>

                    <div className="grid gap-4 mb-4">
                      <div>
                        <label className="text-gray-700 text-sm font-medium block mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={primaryAuthor.name}
                          onChange={(e) => setPrimaryAuthor({ ...primaryAuthor, name: e.target.value })}
                          placeholder="e.g. Dr. Jane Smith"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 text-sm font-medium block mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={primaryAuthor.email}
                          onChange={(e) => setPrimaryAuthor({ ...primaryAuthor, email: e.target.value })}
                          placeholder="e.g. jane.smith@university.edu"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {coAuthors.map((author, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg mt-4 relative border border-gray-200">
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => removeCoAuthor(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove co-author"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Co-Author {index + 1}</h5>
                        <div className="grid gap-4">
                          <div>
                            <label className="text-gray-700 text-sm block mb-1">Name</label>
                            <input
                              type="text"
                              value={author.name}
                              onChange={(e) => updateCoAuthor(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Co-author name"
                            />
                          </div>
                          <div>
                            <label className="text-gray-700 text-sm block mb-1">Email</label>
                            <input
                              type="email"
                              value={author.email}
                              onChange={(e) => updateCoAuthor(index, 'email', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Co-author email"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addCoAuthor}
                      className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 focus:outline-none focus:underline font-medium"
                      aria-label="Add co-author"
                    >
                      <Plus className="w-5 h-5" />
                      Add Co-Author
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Upload */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-gray-900 mb-2">Upload Manuscript</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Upload your research paper and confirm submission requirements
                    </p>
                    <p className="text-sm font-medium text-blue-600 flex items-center justify-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Maximum file size: 5MB
                    </p>
                  </div>

                  {/* Upload Area */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm">
                    <h4 className="flex items-center gap-2 text-gray-900 mb-4">
                      <UploadIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-medium">Manuscript File</span>
                      <span className="text-red-500">*</span>
                    </h4>

                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={handleBoxClick}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 sm:p-12 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        id="file-upload"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        aria-label="Upload manuscript file"
                      />

                      {uploadedFile ? (
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                          </div>
                          <div>
                            <p className="text-gray-900 font-medium mb-1">{uploadedFile.name}</p>
                            <p className="text-sm text-gray-600">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setUploadedFile(null);
                            }}
                            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            aria-label="Remove uploaded file"
                          >
                            Remove File
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                            <UploadIcon className="w-8 h-8 text-blue-600" />
                          </div>
                          <div>
                            <label htmlFor="file-upload" className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                              Click to upload
                            </label>
                            <span className="text-gray-600"> or drag and drop</span>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Checklist */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm">
                    <h4 className="text-gray-900 mb-4 font-medium">Submission Checklist</h4>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={checklist.original}
                          onChange={(e) => setChecklist({ ...checklist, original: e.target.checked })}
                          className="mt-0.5 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          aria-label="Confirm paper originality"
                        />
                        <span className="text-gray-700 text-sm group-hover:text-gray-900">
                          I confirm this paper is original and has not been published elsewhere.
                        </span>
                      </label>

                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-gray-900 mb-2">Review Submission</h3>
                    <p className="text-sm text-gray-600">
                      Please review your information before proceeding to payment
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1 font-medium">Research Track</p>
                      <p className="text-gray-900">{selectedTrack || <span className="text-red-600">Not selected</span>}</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1 font-medium">Paper Title</p>
                      <p className="text-gray-900">{paperTitle || <span className="text-red-600">Not provided</span>}</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1 font-medium">Abstract</p>
                      <p className="text-gray-900 text-sm">{abstract || <span className="text-red-600">Not provided</span>}</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1 font-medium">Keywords</p>
                      <p className="text-gray-900">{keywords || <span className="text-red-600">Not provided</span>}</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1 font-medium">Manuscript</p>
                      <p className="text-gray-900">{uploadedFile?.name || <span className="text-red-600">Not uploaded</span>}</p>
                    </div>
                  </div>

                  {/* Author Review Section */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-3 font-medium">Authors</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          PA
                        </div>
                        <div>
                          <p className="text-gray-900 text-sm font-medium">{primaryAuthor.name || <span className="text-red-500">Name missing</span>}</p>
                          <p className="text-gray-500 text-xs">{primaryAuthor.email || <span className="text-red-500">Email missing</span>}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded-full font-medium">Primary Author</span>
                        </div>
                      </div>

                      {coAuthors.map((author, idx) => (
                        author.name && (
                          <div key={idx} className="flex items-start gap-3 pt-3 border-t border-gray-100">
                            <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                              CA
                            </div>
                            <div>
                              <p className="text-gray-900 text-sm font-medium">{author.name}</p>
                              <p className="text-gray-500 text-xs">{author.email}</p>
                              <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full font-medium">Co-Author</span>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-yellow-900 mb-1 font-semibold">Next Step: Payment Required</h4>
                        <p className="text-yellow-800 text-sm leading-relaxed">
                          After submitting, you will be redirected to the payment portal. Your paper will only
                          be forwarded for review after successful payment confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* STICKY FOOTER - Always Visible */}
        <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 rounded-b-xl sm:rounded-b-2xl sticky bottom-0">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto mb-3">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 sm:px-6 py-2.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Go back to previous step"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back</span>
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 sm:px-6 py-2.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                  aria-label="Cancel submission"
                >
                  Cancel
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 sm:px-8 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                  aria-label="Continue to next step"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handlePayment}
                  disabled={isSubmitting}
                  className="px-6 sm:px-8 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                  aria-label="Proceed to payment"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Payment</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Help Link */}
            <div className="text-center">
              <button
                className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm flex items-center gap-2 mx-auto focus:outline-none focus:underline"
                aria-label="Contact support for help"
              >
                <HelpCircle className="w-4 h-4" />
                Need help with submission? Contact Support
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
