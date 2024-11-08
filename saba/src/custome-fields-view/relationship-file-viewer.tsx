import { css } from "@emotion/css";
import { CardValueComponent } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";
import { ArrowDownIcon } from "@keystone-ui/icons";
import React, { ReactNode } from "react";

const ImageWrapper = ({ children, url }: { children: ReactNode, url?: string }) => {
  if (url) {
    return (
      <a
        style={{
          position: 'relative',
          display: 'block',
          overflow: 'hidden',
          flexShrink: 0,
          lineHeight: 0,
          backgroundColor: '#fafbfc',
          borderRadius: '6px',
          textAlign: 'center',
          width: '120px', // 120px image + chrome
          height: '120px',
          border: '1px solid #e1e5e9',
        }}
        target="_blank"
        href={url}
      >
        {children}
      </a>
    )
  }
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        lineHeight: 0,
        backgroundColor: '#fafbfc',
        borderRadius: '6px',
        textAlign: 'center',
        width: '120px', // 120px image + chrome
        height: '120px',
        border: '1px solid #e1e5e9',
      }}
    >
      {children}
    </div>
  )
}



const styls = {

  flexcenter: css`
    display: flex;
    gap: 1px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-center;
    align-items: center;
    `
}

export const CardValue: CardValueComponent = ({ item, field }) => {

  let url: string = ""
  let ext: string = ""
  const imgextensions = ['jpg', 'png', 'jpeg', 'tiff', 'jfif']

  try {

    url = item.file.url
    ext = item?.file?.filename?.split(".")?.at(-1) || ''


  } catch (error) {
    console.error(error)
  }
  return (
    <FieldContainer>
      <FieldLabel>
        {url && ext ? imgextensions.includes(ext) ? 'عکس' : 'فایل' : field.label}
      </FieldLabel>
      {
        url && ext && imgextensions.includes(ext) ?
          <ImageWrapper url={url} >
            <img src={url} width='100%' alt="" />
          </ImageWrapper>

          : (
            <a href={url} target="_blank"

              className={styls.flexcenter}
            >
              Download File {/* TODO its best have a corespondig file icon  */}
              <ArrowDownIcon />
            </a>
          )


      }

    </FieldContainer>
  )
}