import { graphql } from "@/gql";
import { useMutation } from "@apollo/client";
import Button from "@components/attoms/Button";
import TextForm from "@components/attoms/TextForm";
import { useState } from "react";

const CREATE_CHARACTER = graphql(`
  mutation CreateCharacter($input: CharacterInput!) {
    createCharacter(input: $input) {
      id
      name
    }
  }
`);

const CREATE_SPECIAL_MOVE = graphql(`
  mutation CreateSpecialMove($input: SpecialMoveInput!) {
    createSpecialMove(input: $input) {
      id
      name
    }
  }
`);

const InputForms = () => {
  const [newSpecialMove, setNewSpecialMove] = useState<{
    name: string;
    description: string;
    usedBy: string[];
  }>({
    name: "",
    description: "",
    usedBy: [],
  });

  const [newCharacter, setNewCharacter] = useState<{
    name: string;
    description: string;
    learnedSpecialMoves: string[];
  }>({
    name: "",
    description: "",
    learnedSpecialMoves: [],
  });

  const [
    createSpecialMove,
    { loading: createSpecialMoveLoading, error: createSpecialMoveError },
  ] = useMutation(CREATE_SPECIAL_MOVE, {
    variables: {
      input: {
        name: newSpecialMove.name,
        description: newSpecialMove.description,
        usedBy: newSpecialMove.usedBy,
      },
    },
  });

  const [
    createCharacter,
    { loading: createCharacterLoading, error: createCharacterError },
  ] = useMutation(CREATE_CHARACTER, {
    variables: {
      input: {
        name: newCharacter.name,
        description: newCharacter.description,
        learnedSpecialMoves: newCharacter.learnedSpecialMoves,
      },
    },
  });

  return (
    <div className="flex flex-col size-full">
      <h1 className="text-gallery-200 text-4xl">必殺技追加</h1>
      <form>
        <TextForm
          label="必殺技名"
          placeholder="虚式 茈"
          onChange={(e) =>
            setNewSpecialMove({ ...newSpecialMove, name: e.target.value })
          }
        />
        <TextForm
          label="説明"
          placeholder="術式順転「蒼」と術式反転「赫」を衝突させることで仮想の質量を押し出す技"
          onChange={(e) =>
            setNewSpecialMove({
              ...newSpecialMove,
              description: e.target.value,
            })
          }
        />
        <TextForm
          label="使用キャラクター"
          placeholder="idをカンマ区切りで入力(1,2,3...)"
          onChange={(e) =>
            setNewSpecialMove({
              ...newSpecialMove,
              usedBy: e.target.value.split(","),
            })
          }
        />
        <Button
          type="submit"
          onClick={() => {
            createSpecialMoveLoading ? "loading" : createSpecialMove();
          }}
          disabled={createSpecialMoveLoading}
        >
          {createSpecialMoveLoading ? "ちょっとまって" : "追加"}
        </Button>
      </form>

      <h1 className="text-gallery-200 text-4xl mt-10">キャラクター追加</h1>
      <form>
        <TextForm
          label="キャラクター名"
          placeholder="五条悟"
          onChange={(e) =>
            setNewCharacter({ ...newCharacter, name: e.target.value })
          }
        />
        <TextForm
          label="説明"
          placeholder="現代最強の呪術師、無下限呪術の使い手"
          onChange={(e) =>
            setNewCharacter({ ...newCharacter, description: e.target.value })
          }
        />
        <TextForm
          label="習得している必殺技"
          placeholder="idをカンマ区切りで入力(1,2,3...)"
          onChange={(e) =>
            setNewCharacter({
              ...newCharacter,
              learnedSpecialMoves: e.target.value.split(","),
            })
          }
        />
        <Button
          type="submit"
          onClick={() => {
            createCharacterLoading ? "loading" : createCharacter();
          }}
          disabled={createCharacterLoading}
        >
          {createCharacterLoading ? "ちょっとまって" : "追加"}
        </Button>
      </form>
    </div>
  );
};

export default InputForms;
