import React, { useEffect } from "react";
import { useVerifyEmailMutation } from "../../redux/api/userAPI";
import { useParams } from "react-router-dom";

export default function VerifyEmail() {
  const { id } = useParams();
  const [verifyEmail, { data, isError, isSuccess, isLoading }] =
    // @ts-expect-error id passed must be a number, but we don't call it when it isn't a number
    useVerifyEmailMutation(id);

  // const fetchVerify = async () => {
  //   try {
  //     const response = await verifyEmail(id);

  //     console.log("response", response);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // setTimeout(async () => {
  //   await verifyEmail(id);
  // }, 1000);

  // verifyEmail(id);

  // useEffect(() => {
  //   fetchVerify();
  // }, []);

  console.log("data", data);

  return (
    <div>
      <h1>Verify Email</h1>
    </div>
  );
}
