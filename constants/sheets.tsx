import { ChapterCreationSheet } from "@/components/chapters/ChapterCreationSheet";
import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import ExampleSheet from "@/components/chapters/ExampleSheet";

registerSheet("chapter-creation-sheet", ChapterCreationSheet);
registerSheet("example-sheet", ExampleSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "chapter-creation-sheet": SheetDefinition<{
      payload: {
        onChapterCreated: () => Promise<void>;
      };
    }>;
    "example-sheet": SheetDefinition;
  }
}

export {};
