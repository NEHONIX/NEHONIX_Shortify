interface HeaderProps {
  title: string;
  description: string;
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="text-center mb-12 space-y-4">
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary-gradient-from to-primary-gradient-to text-transparent bg-clip-text">
        {title}
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default Header; 