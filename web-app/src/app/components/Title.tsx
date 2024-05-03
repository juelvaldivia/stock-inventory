interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => (
  <div className="pb-6 pl-14">
    <h1 className="lg:text-3xl md:text-xl font-bold text-center text-primary relative">
      {title}
      <hr className="border-t border-gray-400 my-1 h-1 w-1/4 mx-auto" />
    </h1>
  </div>
);

export default Title;
