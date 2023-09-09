import {MdDashboard, MdSettings, MdImage} from 'react-icons/md'

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = (listItem) => !['config', 'page', 'project'].includes(listItem.getId())

export default (S) =>
  S.list()
    .title('Site')
    .items([
      S.listItem()
        .title('Projects')
        .icon(MdImage)
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('Pages')
        .icon(MdDashboard)
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Site Config')
        .icon(MdSettings)
        .child(
          S.document().id('config').schemaType('config').documentId('config').title('Site Config')
        ),

      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
