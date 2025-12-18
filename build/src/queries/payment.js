"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const insertPayment = `
  INSERT INTO payments (id, created_at)
  VALUES ($1, $2)
`;
const insertUserEvent = `
  INSERT INTO users_events (event_id, user_email, payment_id)
  VALUES ($1, $2, $3);
`;
const PaymentQueries = {
    insertPayment,
    insertUserEvent,
};
exports.default = PaymentQueries;
//# sourceMappingURL=payment.js.map