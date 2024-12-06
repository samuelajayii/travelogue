// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem("blogger").title("Bloggers"), 
      S.documentTypeListItem("post").title("Posts")
    ])
