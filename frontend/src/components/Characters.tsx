import { gql, useQuery } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters {
    charactersCount
    allCharacters {
      id
      name
      description
    }
  }
`;

function Characters() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-full p-8">
      <h1 className="text-gallery-200 text-4xl">Characters</h1>
      <h2 className="text-gallery-200 text-2xl pt-2">
        登録数: {data.charactersCount}
      </h2>
      {data.allCharacters.map(
        (character: { id: string; name: string; description: string }) => (
          <div
            className="text-gallery-200 bg-mako-700 text-xl mt-2 p-2 rounded-lg"
            key={character.id}
          >
            {character.name}
            <div className="text-gallery-200 text-sm break-words">
              {character.description}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

export default Characters;
