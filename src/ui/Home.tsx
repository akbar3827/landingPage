import Header from './header';
import Counter from './Counter';


export const HomePage = () => {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <Header />
        <Counter />
        <h1 className="pt-4 font-bold text-3xl">Welcome in my Reach App.</h1>
      </div>
    </>
  );
};