import Button from "@/components/atoms/Button";
import NumberForm from "@/components/atoms/NumberForm";
import TextForm from "@/components/atoms/TextForm";
import { graphql } from "@/gql";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

export const GET_SPECIAL_MOVES = graphql(`
  query GetSpecialMoves($after: DateTime) {
    specialMovesCount
    allSpecialMoves(after: $after) {
      id
      name
      description
      usedBy {
        id
        name
      }
    }
  }
`);

const DELETE_SPECIAL_MOVE = graphql(`
  mutation DeleteSpecialMove($id: ID!) {
    deleteSpecialMove(id: $id) {
      id
    }
  }
`);

function SpecialMoves() {
  const [pollInterval, setPollInterval] = useState("");
  const [after, setAfter] = useState<string | null>(null);
  const [afterFormValue, setAfterFormValue] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_SPECIAL_MOVES, {
    variables: { after },
    pollInterval: pollInterval ? Number.parseInt(pollInterval) : 0,
  });

  const [deleteSpecialMove, { loading: deleteSpecialMoveLoading }] =
    useMutation(DELETE_SPECIAL_MOVE, {
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            specialMovesCount: (existingData) => existingData - 1,
            allSpecialMoves: (existingMovesRefs, { readField }) =>
              existingMovesRefs.filter(
                (moveRef: { id: string }) =>
                  data?.deleteSpecialMove.id !== readField("id", moveRef),
              ),
          },
        });
        cache.evict({ id: `SpecialMove:${data?.deleteSpecialMove.id}` });
      },
    });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="size-full p-4">
      <h1 className="text-gallery-200 text-4xl">Special Moves</h1>
      <h2 className="text-gallery-200 text-2xl pt-2">
        登録数: {data?.specialMovesCount}
      </h2>
      <TextForm
        label="日付フィルター"
        value={afterFormValue}
        onChange={(e) => {
          if (e.target.value === "") {
            setAfter(null);
            setAfterFormValue("");
            return;
          }
          const d = new Date(e.target.value);
          const isValidDateString =
            !Number.isNaN(d.getTime()) && d.toISOString() === e.target.value;

          if (isValidDateString) {
            setAfter(e.target.value);
          }
          setAfterFormValue(e.target.value);
        }}
        placeholder="2021-09-01T00:00:00.000Z"
      />
      <NumberForm
        label="ポーリング"
        value={pollInterval ? Number.parseInt(pollInterval) : 0}
        onChange={(e) => {
          setPollInterval(e.target.value);
        }}
        placeholder="1000"
      />
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
            <div className="font-bold">
              {move.id}: {move.name}
            </div>
            <div className="text-gallery-200 text-sm break-words">
              {move.description}
            </div>
            <div className="text-gallery-200 text-sm break-words mt-2">
              <span className="font-bold">使用しているキャラクター</span>
              <div className="flex flex-wrap gap-2">
                {move.usedBy.map((character) => (
                  <div key={character.id}>{character.name}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="justify-self-end">
            <Button
              onClick={async () => {
                await deleteSpecialMove({ variables: { id: move.id } });
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
