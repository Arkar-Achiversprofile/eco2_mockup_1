import { loadStripe } from "@stripe/stripe-js";


const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutButton = ({ amount = 1 }) => {
  const handler = async () => {
    try {
      const stripe = await asyncStripe;
      const res = await fetch("/api/stripe/session", {
        method: "POST",
        body: JSON.stringify({
          amount,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const { sessionId } = await res.json();

      const { error } = await stripe.redirectToCheckout({ sessionId });
      console.log(error);
      if (error) {
        // router.push("/error");
        console.log('error', error)
      }
    } catch (err) {
      console.log(err);
    //   router.push("/error");
    }
  };

  return (
    <button
      onClick={handler}
      className="bg-blue-700 hover:bg-blue-800 duration-200 px-8 py-4 text-white"
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;