import React, { Component } from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
        return(
            <div style={{ height: "100%", paddingTop: "3rem" }}>
                {colors.map((color, i) => 
                  <DraggableColorBox
                    index={i}
                    key={color.name} 
                    color={color.color}
                    name={color.name}
                    handleDelete={() => removeColor(color.name)}
                  />)}
            </div>
        );
});

export default DraggableColorList;