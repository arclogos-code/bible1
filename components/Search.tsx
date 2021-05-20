import { Input } from "@chakra-ui/react"
import React, { useEffect } from "react";
import List from 'list.js'

export default function createSearchFilter() {
  const options = {
    valueNames: ['chapter']
  };
  const list = new List('chapterList', options);
  console.log(list)

  return (
    <Input className="search" />
  )
}