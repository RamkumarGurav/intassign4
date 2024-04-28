import LoginCard from "./LoginCard";

export default function InputForm() {
  return (
    <section
      id="Section"
      className={`bg-gray-300 py-[35px] sm:py-[50px] sm:px-[35px] xl:px-[70px] min-h-screen  
      |||  flex justify-center items-center`}
    >
      <title>Login</title>
      <LoginCard />
    </section>
  );
}
