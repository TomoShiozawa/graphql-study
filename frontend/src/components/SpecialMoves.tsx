import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";
import Button from "@components/attoms/Button";

const GET_SPECIAL_MOVES = graphql(`
  query GetSpecialMoves {
    specialMovesCount
    allSpecialMoves {
      id
      name
      description
    }
  }
`);

function SpecialMoves() {
  const { loading, error, data, refetch } = useQuery(GET_SPECIAL_MOVES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="size-full p-8">
      <h1 className="text-gallery-200 text-4xl">Special Moves</h1>
      <h2 className="text-gallery-200 text-2xl pt-2">
        登録数: {data?.specialMovesCount}
      </h2>
      <Button
        onClick={() => {
          refetch();
        }}
      >
        <span>再取得</span>
      </Button>
      {data?.allSpecialMoves.map((move) => (
        <div
          className="text-gallery-200 bg-mako-700 text-xl mt-2 p-2 rounded-lg"
          key={move.id}
        >
          {move.name}
          <div className="text-gallery-200 text-sm break-words">
            {move.description}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpecialMoves;
