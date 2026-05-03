import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount, planName } = await request.json();

    if (!amount || !planName) {
      return Response.json({ error: 'Amount and plan name required' }, { status: 400 });
    }

    const options = {
      amount: parseInt(amount) * 100,
      currency: 'INR',
      receipt: `claire_${planName.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
      notes: { planName },
    };

    const order = await razorpay.orders.create(options);

    return Response.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Order creation failed:', error);
    return Response.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
