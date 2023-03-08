import { FormEvent, useState } from "react";
import { Tldraw, useFileSystem } from "@tldraw/tldraw";
import { CustomCursor } from "./Cursor";
import { useAssets } from "../hooks/useAssets";
import { useMultiplayer } from "../hooks/useMultiplayer";
import { useSingleplayer } from "../hooks/useSingleplayer";
import { doc as localDoc, initPersistence } from "../utils/y-indexeddb";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import PropTypes from "prop-types";
import {
  Multiplayer,
  MultiplayerReadOnly,
  Settings,
  Singleplayer,
} from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faShareNodes,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

Editor.propTypes = {
  idbName: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  wsUrl: PropTypes.string,
  roomId: PropTypes.string,
  language: PropTypes.string,
  readOnly: PropTypes.bool,
  cantJoin: PropTypes.bool,
  cantLeave: PropTypes.bool,
  cantShare: PropTypes.bool,
};

const components = {
  Cursor: CustomCursor,
};

function Editor({
  idbName,
  apiUrl,
  wsUrl,
  roomId,
  language,
  readOnly,
  cantJoin,
  cantLeave,
  cantShare,
}: Settings) {
  const [room, setRoom] = useState(roomId);
  const [joinRoom, setJoinRoom] = useState(undefined);
  const [wantJoinRoom, setWantJoinRoom] = useState(false);
  const [useLocalDoc, setUseLocalDoc] = useState(false);

  language = language || "en";
  initPersistence(idbName);
  let editor = <SingleplayerEditor apiUrl={apiUrl} language={language} />;
  if (wsUrl && room) {
    const doc = new Y.Doc();
    useLocalDoc && Y.applyUpdate(doc, Y.encodeStateAsUpdate(localDoc));
    const provider = new WebsocketProvider(wsUrl, room, doc, { connect: true });
    editor = readOnly ? (
      <MultiplayerReadOnlyEditor
        doc={doc}
        provider={provider}
        roomId={room}
        language={language}
      />
    ) : (
      <MultiplayerEditor
        apiUrl={apiUrl}
        doc={doc}
        provider={provider}
        roomId={room}
        language={language}
      />
    );
  }

  const resetStates = () => {
    setRoom(undefined);
    setJoinRoom(undefined);
    setWantJoinRoom(false);
    setUseLocalDoc(false);
  };

  return (
    <div>
      {wsUrl && !room && (
        <div className="share-container">
          {!cantShare && !readOnly && (
            <a
              className="share-item"
              onClick={() => setRoom(uuidv4())}
              title="Generate a room"
            >
              <FontAwesomeIcon icon={faUsers} />
            </a>
          )}
          {!cantShare && !readOnly && (
            <a
              className="share-item"
              onClick={() => {
                setUseLocalDoc(true);
                setRoom(uuidv4());
              }}
              title="Share current document"
            >
              <FontAwesomeIcon icon={faShareNodes} />
            </a>
          )}
          {!cantJoin && !wantJoinRoom && (
            <a
              className="share-item"
              onClick={() => setWantJoinRoom(true)}
              title="Join room"
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </a>
          )}
          {!cantJoin && wantJoinRoom && (
            <input
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setJoinRoom(e.target.value)
              }
              className="input-join"
              type="text"
              placeholder="id of room to join..."
              maxLength={uuidv4().length}
              autoFocus
            ></input>
          )}
          {!cantJoin && wantJoinRoom && (
            <a
              className="share-item"
              onClick={resetStates}
              title="Close joining room input"
            >
              <FontAwesomeIcon icon={faXmark} />
            </a>
          )}
          {!cantJoin && joinRoom && uuidValidate(joinRoom) && (
            <a
              className="share-item"
              onClick={() => setRoom(joinRoom)}
              title="Join room"
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} />
            </a>
          )}
        </div>
      )}
      {wsUrl && room && (
        <div className="leave-container">
          {!cantShare && (
            <a
              className="leave-item"
              onClick={() => navigator.clipboard.writeText(room)}
              title="Copy room id to clipboard"
            >
              {room}
            </a>
          )}
          {!cantLeave && (
            <a className="leave-item" onClick={resetStates} title="Leave room">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </a>
          )}
        </div>
      )}
      {editor}
    </div>
  );
}

function SingleplayerEditor({ apiUrl, language }: Singleplayer) {
  const fileSystemEvents = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const { ...events } = useSingleplayer(language);

  return (
    <Tldraw
      autofocus
      showMultiplayerMenu={false}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      {...fileSystemEvents}
      {...events}
    />
  );
}

function MultiplayerEditor({
  apiUrl,
  doc,
  provider,
  roomId,
  language,
}: Multiplayer) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { onAssetCreate, onAssetDelete, onAssetUpload } = useAssets(apiUrl);
  const { ...events } = useMultiplayer(doc, provider, roomId, language);

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      onAssetCreate={onAssetCreate}
      onAssetDelete={onAssetDelete}
      onAssetUpload={onAssetUpload}
      onSaveProjectAs={onSaveProjectAs}
      onSaveProject={onSaveProject}
      {...events}
    />
  );
}

function MultiplayerReadOnlyEditor({
  doc,
  provider,
  roomId,
  language,
}: MultiplayerReadOnly) {
  const { onSaveProjectAs, onSaveProject } = useFileSystem();
  const { ...events } = useMultiplayer(doc, provider, roomId, language);

  return (
    <Tldraw
      autofocus
      components={components}
      showPages={false}
      showMultiplayerMenu={false}
      onSaveProjectAs={onSaveProjectAs}
      onSaveProject={onSaveProject}
      readOnly
      {...events}
    />
  );
}

export default Editor;