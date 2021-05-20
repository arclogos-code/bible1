import { Input } from "@chakra-ui/react"
import React, { useEffect } from "react";
import List from 'list.js'

export default function createSearchFilter() {

  const listObject = new List('chapters', {
    valueNames: ['chapter']
  });

  const handle = (event) => {
    let query = event.target.value
    listObject.search(query);
  };

  return (
    <Input className="search" onKeyUp={handle} />
  )
}