/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import * as React from 'react'
import { ChangeEvent, useState } from 'react'
import { Plugin } from '@tinacms/core'

import { ImageProps } from '../../types'
import { Wysiwyg as WysiwygEditor } from '../Editor'
import { MarkdownEditor } from '../MarkdownEditor'

export interface RawModeEditorProps {
  defaultValue: string
  imageProps?: ImageProps
  onChange: (value: string) => void
  plugins?: Plugin[]
  sticky?: boolean
}

export const RawModeEditor = ({
  defaultValue,
  imageProps,
  onChange,
  plugins,
  sticky,
}: RawModeEditorProps) => {
  const [mode, setMode] = useState('wysiwyg')
  const [value, setValue] = useState(defaultValue)

  const handleChange = (value: string) => {
    setValue(value)
    onChange(value)
  }

  const handleModeChange = (evt: ChangeEvent<HTMLInputElement>) =>
    setMode(evt.target.value)

  return (
    <>
      <div>
        <input
          type="radio"
          name="mode"
          value="wysiwyg"
          checked={mode === 'wysiwyg'}
          onChange={handleModeChange}
        />
        <span>Wysiwyg mode</span>
        <br />
        <input
          type="radio"
          name="mode"
          value="raw"
          checked={mode === 'raw'}
          onChange={handleModeChange}
        />
        <span>Raw mode</span>
      </div>
      {mode === 'raw' ? (
        <MarkdownEditor value={value} onChange={handleChange} />
      ) : (
        <WysiwygEditor
          input={{
            value,
            onChange: handleChange,
          }}
          plugins={plugins}
          sticky={sticky}
          format="markdown"
          imageProps={imageProps}
          markdownToggle={() => setMode('raw')}
        />
      )}
    </>
  )
}
