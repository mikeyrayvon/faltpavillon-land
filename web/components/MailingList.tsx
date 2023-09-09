import { useState } from "react";
import { postData } from "utils/api";

const MailingList = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();

    setErrors([]);
    setSuccess(false);
    setLoading(true);

    const { first, last, email } = event.target;

    // call api endpoint for mailchimp subscription
    postData(`/api/subscribe`, {
      first: first.value,
      last: last.value,
      email: email.value,
    })
      .then((data) => {
        if (data.error_count > 0) {
          const errorMessages = data.errors.map((item) => item.error);
          setErrors(errorMessages);
          setLoading(false);
        } else {
          console.log("Success", data);
          setLoading(false);
          setSuccess(true);
          event.target.reset();
        }
      })
      .catch((error) => {
        console.error("Error", error);
        setErrors(["Error"]);
        setLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <div className="flex flex-no-wrap gap-4 mb-4">
          <div className="w-1/2">
            <label className="block" htmlFor="first-name">
              <span className="hidden">First Name</span>
              <input
                className="block w-full border-b bg-transparent focus:ring-0 focus:border-green-400"
                id="first"
                name="first"
                type="text"
                autoComplete="given-name"
                placeholder="First Name"
                required
              />
            </label>
          </div>
          <div className="w-1/2">
            <label className="block" htmlFor="last-name">
              <span className="hidden">Last Name</span>
              <input
                className="block w-full border-b bg-transparent focus:ring-0 focus:border-green-400"
                id="last"
                name="last"
                type="text"
                autoComplete="family-name"
                placeholder="Last Name"
                required
              />
            </label>
          </div>
        </div>
        <div className="flex flex-no-wrap gap-4 mb-4">
          <div className="w-full">
            <label className="block" htmlFor="email">
              <span className="hidden">Email</span>
              <input
                className="block w-full border-b bg-transparent focus:ring-0 focus:border-green-400"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                required
              />
            </label>
          </div>
          <div className="w-[200px]">
            <button
              type="submit"
              className="w-full disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none focus:ring-0 focus:border-green-600 border bg-white h-full py-4 md:py-0"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </div>
      </form>
      {success && (
        <div className="mb-4">
          <p className="text-green-600 text-xs">Thanks for subscribing!</p>
        </div>
      )}
      <div className={errors.length > 0 ? "mb-4" : ""}>
        <ul>
          {errors.map((error) => (
            <li className="mb-2 text-yellow-500 text-xs">{error}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MailingList;
