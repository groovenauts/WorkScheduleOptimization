import React from 'react'
import {
  LocaleProvider,
} from 'antd';
import jaJP from 'antd/lib/locale-provider/ja_JP';

export const antdDecorator = story => (
  <LocaleProvider locale={jaJP}>
    {story()}
  </LocaleProvider>
)
