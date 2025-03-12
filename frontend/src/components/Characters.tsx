import Button from "@/components/atoms/Button";
import { graphql } from "@/gql";
import { useMutation, useQuery } from "@apollo/client";

const GET_CHARACTERS = graphql(`
  query GetCharacters {
    charactersCount
    allCharacters {
      id
      name
      description
      learnedSpecialMoves {
        id
        name
      }
    }
  }
`);

const DELETE_CHARACTER = graphql(`
  mutation DeleteCharacter($id: ID!) {
    deleteCharacter(id: $id){
      id
    }
  }
`);

function Characters() {
  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS);

  const [deleteCharacter, { loading: deleteCharacterLoading }] =
    useMutation(DELETE_CHARACTER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-gallery-200 text-4xl">Characters</h1>
      <h2 className="text-gallery-200 text-2xl pt-2">
        登録数: {data?.charactersCount}
      </h2>
      <Button
        onClick={() => {
          refetch();
        }}
      >
        <span>再取得</span>
      </Button>
      {data?.allCharacters.map((character) => (
        <div
          className="flex text-gallery-200 bg-mako-700 text-xl mt-2 p-2 rounded-lg"
          key={character.id}
        >
          <div className="flex-1">
            <div className="font-bold">
              {character.id}: {character.name}
            </div>
            <div className="text-gallery-200 text-sm break-words">
              {character.description}
            </div>
            <div className="text-gallery-200 text-sm break-words mt-2">
              <span className="font-bold">習得している必殺技</span>
              <div className="flex flex-wrap gap-2">
                {character.learnedSpecialMoves.map((specialMove) => (
                  <div key={specialMove.id}>{specialMove.name}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="justify-self-end">
            <Button
              onClick={() => {
                deleteCharacter({ variables: { id: character.id } });
                refetch();
              }}
              disabled={deleteCharacterLoading}
            >
              {deleteCharacterLoading ? "ちょっとまって" : "削除"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Characters;
