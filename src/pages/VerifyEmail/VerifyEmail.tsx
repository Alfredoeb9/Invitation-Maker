import React, { useEffect } from "react";
import { useVerifyEmailMutation } from "../../redux/api/userAPI";
import { Link, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

export default function VerifyEmail() {
  const { id } = useParams();

  const [verifyEmail, { data, isError, isSuccess, isLoading, error }] =
    useVerifyEmailMutation(id ?? (skipToken as any));

  const fetchVerify = async () => {
    try {
      await verifyEmail(id);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchVerify();
  }, []);

  return (
    <div className="content-center h-[80dvh] w-full rounded-3xl text-center text-black">
      <div className="bg-white max-w-fit ms-auto me-auto p-10 rounded-2xl">
        {isSuccess && (
          <div className="email-verified text-lg">
            <h1 className="text-4xl font-bold">Verified</h1>
            <span className="font-bold">
              {" "}
              Thank you for verifying your email.{" "}
            </span>
            <br />
            Please{" "}
            <Link
              to={`/login`}
              className="bg-cyan-500 rounded-xl py-1 px-2 text-white hover:bg-cyan-600 transition-all"
            >
              sign-in
            </Link>{" "}
            to access your account.
          </div>
        )}

        {isError && (
          <div className="verified-error text-lg">
            <h1 className="text-4xl font-bold">Verify Email</h1>
            {/* @ts-expect-error data is present during error */}
            <span className="font-bold text-red-500">{error?.data.error}</span>
          </div>
        )}
      </div>
    </div>
  );
}
