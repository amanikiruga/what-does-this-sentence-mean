export default function Output({
    sentencesWithDefinitions,
    meaning,
    error,
}: {
    sentencesWithDefinitions: JSX.Element[];
    meaning: string;
    error: string;
}) {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-4">
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
