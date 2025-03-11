import { graphql } from "@/gql";
import { useMutation, useQuery } from "@apollo/client";
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

const DELETE_SPECIAL_MOVE = graphql(`
  mutation DeleteSpecialMove($id: ID!) {
    deleteSpecialMove(id: $id)
  }
`);

function SpecialMoves() {
  const { loading, error, data, refetch } = useQuery(GET_SPECIAL_MOVES);

  const [deleteSpecialMove, { loading: deleteSpecialMoveLoading }] =
    useMutation(DELETE_SPECIAL_MOVE);

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
          className="flex text-gallery-200 bg-mako-700 text-xl mt-2 p-2 rounded-lg"
          key={move.id}
        >
          <div className="flex-1">
            {move.id}: {move.name}
            <div className="text-gallery-200 text-sm break-words">
              {move.description}
            </div>
          </div>
          <div className="justify-self-end">
            <Button
              onClick={() => {
                deleteSpecialMove({ variables: { id: move.id } });
                refetch();
              }}
              disabled={deleteSpecialMoveLoading}
            >
              {deleteSpecialMoveLoading ? "ちょっとまって" : "削除"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpecialMoves;
