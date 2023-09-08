export default function Output({
    sentencesWithDefinitions,
    meaning,
    error,
    submittedAtLeastOnce,
}: {
    sentencesWithDefinitions: JSX.Element[];
    meaning: string;
    error: string;
    submittedAtLeastOnce: boolean;
}) {
    return (
        <div
            className={`bg-gray-100 p-6 rounded-lg shadow-lg mt-4 transition-opacity ease-in duration-700 ${
                submittedAtLeastOnce ? "opacity-100" : "opacity-0"
            }`}
        >
            <h2 className="text-2xl font-semibold mb-4">Meaning</h2>
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <p className="text-gray-800 mb-4">
                        {meaning
                            ? meaning[0].toUpperCase() + meaning.slice(1)
                            : ""}
                    </p>
                    <p className="text-gray-800 text-sm mb-4">
                        (Click on a phrase to see its definition)
                    </p>
                    {sentencesWithDefinitions}
                </>
            )}
        </div>
    );
}
