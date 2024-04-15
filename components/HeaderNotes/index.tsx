import DeployButton from '../DeployButton';
import AuthButton from '../AuthButton';

const HeaderNotes = () => {
  return (
    <header className="bg-gray-100 border-b border-gray-200 py-4 w-full">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="hidden sm:block text-2xl font-bold text-black">My Notes</span>
          </div>
          <div className="flex items-center space-x-8">
            <AuthButton />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderNotes;
