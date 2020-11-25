import React, { Component } from 'react'

export default function Cell({
    content,
    header,
  }) {
  
    const cellMarkup = header ? (
      <th className="text-center">
        {content}
      </th>
    ) : (
      <td className="Cell">
        {content}
      </td>
    );
  
    return (cellMarkup);
  }