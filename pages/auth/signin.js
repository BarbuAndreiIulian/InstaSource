import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";
import instagram from "../../assets/instagram.png";
import Image from "next/image";

export default function SignIn({ providers }) {
  return (
    /////////////

    <>
      {Object.values(providers).map((provider) => (
        <div
          key={provider.name}
          className="  mx-auto    flex flex-col justify-center items-center"
        >
          <div className="w-screen">
            <Header />
          </div>

          <div className="w-80 mx-auto mt-16">
            <Image src={instagram} />
          </div>

          <p className="mt-0 mb-40 text-center">
            This is not a REAL app it is built for educational purpose only!
          </p>

          <div className="bg-[#0095f6] rounded-full    max-w-[11rem] flex justify-center p-3 mx-auto text-white -mt-24">
            <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Sign in with {provider.name}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
