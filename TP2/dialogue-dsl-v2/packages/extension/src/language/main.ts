import { startLanguageServer } from 'langium/lsp';
import { NodeFileSystem } from 'langium/node';
import { createConnection, ProposedFeatures } from 'vscode-languageserver/node';
import { createDialogueDslV2Services } from 'dialogue-dsl-v-2-language';

// Create a connection to the client
const connection = createConnection(ProposedFeatures.all);

// Inject the shared services and language-specific services
const { shared } = createDialogueDslV2Services({ connection, ...NodeFileSystem });

// Start the language server with the shared services
startLanguageServer(shared);
