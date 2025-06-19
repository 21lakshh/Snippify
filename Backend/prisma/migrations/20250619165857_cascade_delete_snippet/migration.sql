-- DropForeignKey
ALTER TABLE "SnippetTag" DROP CONSTRAINT "SnippetTag_snippetId_fkey";

-- AddForeignKey
ALTER TABLE "SnippetTag" ADD CONSTRAINT "SnippetTag_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
