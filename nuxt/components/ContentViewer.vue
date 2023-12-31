<script lang="ts" setup>
type TextObject = Record<string, string> & { text: string }

interface BaseObject extends Record<string, any> {
  type: string
  children: (Record<string, string | BaseObject> | TextObject)[]
}

function renderTextBlock (obj: TextObject) {
  if (obj.children) {
    return renderBlock(obj)
  } else {
    const { text } = obj
    if (obj.code) { return `<code>${text}</code>` }
    if (obj.italic) { return `<i>${text}</i>` }
    if (obj.bold) { return `<strong>${text}</strong>` }
    if (text === '') { return '<br />' }
    return text
  }
}

// this value is for editor
function renderHeading (obj: BaseObject) {
  const { level, children } = obj

  return children
    .map(i => `<h${level}>${renderTextBlock(i as TextObject)}</h${level}>`)
    .join('')
}

function renderParagraph (obj: BaseObject) {
  const { children, textAlign = 'rigth' } = obj

  return (
    `<p style="text-align: ${textAlign}" >` +
    children.map(i => renderTextBlock(i as TextObject)).join('') +
    '</p>'
  )
}

function renderLink (obj: BaseObject) {
  const { children, href } = obj

  return children
    .map(
      i =>
        `<a target="_blank" href="${href}" > ${renderTextBlock(
          i as TextObject
        )} </a>`
    )
    .join('')
}

function renderBlockquote (obj: BaseObject) {
  const { children } = obj

  return children
    .map(
      i => `<blockquote > ${renderTextBlock(i as TextObject)} </blockquote>`
    )
    .join('')
}

function renderListItem (obj: BaseObject) {
  const { children } = obj

  return children
    .map(i => `<li > ${renderTextBlock(i as TextObject)} </li>`)
    .join('')
}
function renderImage (src: string) {
  return `<img src="${src}" />`
}

function renderDivider () {
  return '<hr />'
}

function renderGeneralItem (tag: string, obj: BaseObject) {
  const { children } = obj

  return (
    `<${tag} >` +
    children.map(i => renderTextBlock(i as TextObject)).join('') +
    `</${tag}>`
  )
}

function renderLayout (obj: BaseObject) {
  const { children } = obj
  const layout: number[] = obj.layout
  const layoutLength = layout.reduce((t, i) => (t += i), 0)
  return (
    `<div data-slate-layout="${layoutLength}" >` +
    layout
      .map((i, index) => {
        return `<div data-slate-width="${i}">
      ${renderBlock(children[index])}
      </div>`
      })
      .join('') +
    '</div>'
  )
}

function renderBlock (blocks: BaseObject | BaseObject[]) {
  let renderd = ''

  if (Array.isArray(blocks)) {
    blocks.forEach((block) => {
      renderd += renderBlock(block)
    })
  } else {
    switch (blocks.type) {
      case 'paragraph':
        renderd += renderParagraph(blocks)
        break

      case 'heading':
        renderd += renderHeading(blocks)
        break

      case 'link':
        renderd += renderLink(blocks)
        break

      case 'blockquote':
        renderd += renderBlockquote(blocks)
        break

      case 'ordered-list':
        renderd += renderGeneralItem('ol', blocks)
        break

      case 'unordered-list':
        renderd += renderGeneralItem('ul', blocks)
        break

      case 'list-item-content':
        renderd += renderGeneralItem('span', blocks)
        break

      case 'list-item':
        renderd += renderListItem(blocks)
        break

      case 'divider':
        renderd += renderDivider()
        break
      case 'component-block':
        if (blocks.component === 'hero') { renderd += renderImage(blocks.props.imageSrc) }
        break

      case 'layout-area':
        // @ts-ignore
        renderd += renderBlock(blocks.children)
        break

      case 'layout':
        renderd += renderLayout(blocks)
        break

      default:
        console.error('**UNDEFINED BLOCK**', blocks.type)

        break
    }
  }

  return renderd
}

const { content } = defineProps({
  content: {
    type: Array,
    default: () => []
  }
})

const renderdContent = renderBlock(content)
</script>

<template>
  <div class="slate flex flex-col gap-2">
    <!-- flex flex-col gap-2 are experimental -->
    <div class="leading-7" v-html="renderdContent" />
  </div>
</template>

<style lang="scss">
.slate {
  h1 {
    @apply text-4xl;
  }

  h2 {
    @apply text-3xl;
  }

  h3 {
    @apply text-2xl;
  }

  h4 {
    @apply text-xl;
  }

  h5 {
    @apply text-lg;
  }

  code,
  a {
    @apply px-0.5;
  }

  a {
    @apply text-blue-500;
  }

  ul {
    @apply list-inside list-disc;
  }

  ol {
    // list-style-type: upper-roman;
    @apply list-inside list-decimal;
  }
  li span {
    @apply pr-2;
  }

  hr {
    @apply my-8 h-px border-0 bg-gray-400;
  }

  blockquote {
    @apply my-2 border-r-4 border-gray-500 bg-gray-200 py-6 px-2 font-bold text-gray-700;
  }

  img {
    @apply max-h-80 object-cover;
  }

  [data-slate-layout] {
    @apply grid; /** for debug colorize column */
  }

  [data-slate-layout='2'] {
    @apply grid-cols-1 md:grid-cols-2;
  }

  [data-slate-layout='3'] {
    @apply grid-cols-3;
  }

  [data-slate-width='1'] {
    @apply col-span-1;
  }

  [data-slate-width='2'] {
    @apply col-span-2;
  }

  [data-slate-width='3'] {
    @apply col-span-2;
  }
}
</style>
