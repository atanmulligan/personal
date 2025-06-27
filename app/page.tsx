'use client'
import { useState } from "react";
import Button from "./components/v1/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [login, setLogin] = useState(false)
  const [password, setPassword] = useState("")


  const handleAdmin = () => {
    setLogin(true)
  }
  const handlePassword = (e: any) => {
    setPassword(e.target.value)
  }

  const checkPassword = async (e: any) => {
    e.preventDefault()
    const result_checkPassword = await fetch('/api/v1/Admin/checkPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    const result = await result_checkPassword.json()
    if (result.result === "success") {
      router.push("/v1/admin")
    } else {
      alert("password incorrect")
    }
    setLogin(false)
    setPassword("")
  }

  function handleAdminPageClick() {

    // const result_checkPassword = await checkPassword({ password: "1234" })
    // router.push("/v1/admin")
  }

  return (
    <>
      {login && (
        <div
          id="signIn"
          className="flex flex-col items-center w-screen h-screen fixed z-10 bg-white bg-opacity-90 top-0 left-0"
        >
          <form onSubmit={checkPassword}>
            <div className="my-80 px-20 py-10 border-2 border-black flex flex-col justify-center rounded bg-white gap-4">
              <div className="w-full flex justify-center">PASSWORD</div>
              <div className="w-full flex justify-center">
                <input
                  id="password"
                  type="password"
                  className="border-2 border-gray-400 w-full rounded"
                  onChange={handlePassword}
                  value={password}
                />
              </div>
              <div className="w-full flex justify-center">
                <Button label="log in" />
              </div>
            </div>
          </form>
        </div>

      )}
      <div className="flex flex-col items-center">
        <div className="text-xl my-12">
          <b>
            Digital Dopplegänger Expt. 2
          </b>
        </div>
        <div className="my-24">
          <Button label="admin page" onClick={handleAdmin} active={true} />
        </div>

      </div>
    </>
  );
}
