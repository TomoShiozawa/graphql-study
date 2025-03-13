import { graphql } from "@/gql";
import { useSubscription } from "@apollo/client";

const SPECIAL_MOVES_SUBSCRIPTION = graphql(`
  subscription NewSpecialMove {
    newSpecialMove {
      name
      usedBy {
        id
        name
      }
      createdAt
    }
  }
`);

function Subscriptions() {
  const { data, error } = useSubscription(SPECIAL_MOVES_SUBSCRIPTION);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="size-full p-4">
      <h1 className="text-gallery-200 text-4xl">New Special Move</h1>
      <div className="text-gallery-200 font-bold mt-2">必殺技名</div>
      <div className="text-gallery-200 text-2xl">
        {data?.newSpecialMove.name}
      </div>
      <div className="text-gallery-200 font-bold mt-2">使用キャラクター</div>
      <div className="flex flex-wrap gap-2">
        {data?.newSpecialMove.usedBy.map((character) => (
          <div className="text-gallery-200 text-md" key={character.id}>
            {character.name}
          </div>
        ))}
      </div>
      <div className="text-gallery-200 font-bold mt-2">作成日時</div>
      <div className="text-gallery-200 text-md">
        {data?.newSpecialMove.createdAt}
      </div>
    </div>
  );
}

export default Subscriptions;
