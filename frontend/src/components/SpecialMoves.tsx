import { gql, useQuery } from "@apollo/client";

const GET_SPECIAL_MOVES = gql`
  query GetSpecialMoves {
    specialMovesCount
    allSpecialMoves {
      id
      name
      description
    }
  }
`;

function SpecialMoves() {
  const { loading, error, data } = useQuery(GET_SPECIAL_MOVES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-full p-8">
      <h1 className="text-gallery-200 text-4xl">Special Moves</h1>
      <h2 className="text-gallery-200 text-2xl pt-2">
        登録数: {data.specialMovesCount}
      </h2>
      {data.allSpecialMoves.map(
        (move: { id: string; name: string; description: string }) => (
          <div
            className="text-gallery-200 bg-mako-700 text-xl mt-2 p-2 rounded-lg"
            key={move.id}
          >
            {move.name}
            <div className="text-gallery-200 text-sm break-words">
              {move.description}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

export default SpecialMoves;
