import LoginCard from "./LoginCard";

export default function InputForm() {
  return (
    <section
      id="Section"
      className={`bg-gray-300 py-[35px] sm:py-[50px] sm:px-[35px] xl:px-[70px] min-h-screen  
      |||  flex flex-col justify-center items-center`}
    >
      <title>Login</title>
      <div className="flex gap-1  p-2 mb-4 rounded-full flex-col justify-center items-center">
        <p className="font-bold underline">test credentials</p>
        <p> username:Hukum Gupta</p>
        <p>password:hukum1234</p>
      </div>
      <LoginCard />
    </section>
  );
}
