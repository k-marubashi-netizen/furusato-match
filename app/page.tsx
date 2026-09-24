'use client'
import { useEffect } from 'react'

const SKELETON = `<div id="app">
  <div id="main"></div>
  <nav id="nav"></nav>
  <div class="sheet-bg" id="sheetBg"></div>
  <div class="sheet" id="sheet"></div>
  <div class="toast" id="toast"></div>
</div>`

export default function Page() {
  useEffect(() => {
    if (document.getElementById('fm-app-js')) return
    const s = document.createElement('script')
    s.id = 'fm-app-js'; s.src = '/furusato-app.js'; s.defer = true
    document.body.appendChild(s)
  }, [])
  return <div dangerouslySetInnerHTML={{ __html: SKELETON }} />
}
