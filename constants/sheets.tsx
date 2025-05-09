import { ChapterCreationSheet } from "@/components/chapters/ChapterCreationSheet";
import { registerSheet, SheetDefinition } from "react-native-actions-sheet";
import { ReadingSheet } from "@/components/reading-module/ReadingSheet";

registerSheet("chapter-creation-sheet", ChapterCreationSheet);
registerSheet("reading-sheet", ReadingSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module "react-native-actions-sheet" {
  interface Sheets {
    "chapter-creation-sheet": SheetDefinition<{
      payload: {
        onChapterCreated: () => Promise<void>;
      };
    }>;
    "reading-sheet": SheetDefinition<{
      payload: {
        chapterId: string;
      };
    }>;
  }
}

export {};
