const Features = () => {
  return (
    <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-semibold mb-2">Rapide & Facile</h3>
        <p className="text-gray-600">
          Raccourcissez vos URLs en quelques secondes avec notre interface intuitive
        </p>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-semibold mb-2">Suivi des Clics</h3>
        <p className="text-gray-600">
          Surveillez combien de fois vos liens raccourcis sont cliqués
        </p>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-xl font-semibold mb-2">Sécurisé & Fiable</h3>
        <p className="text-gray-600">
          Vos liens sont sécurisés et toujours accessibles quand vous en avez besoin
        </p>
      </div>
    </div>
  );
};

export default Features; 