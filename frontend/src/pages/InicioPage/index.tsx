import React from 'react'
import{ Card }from"antd";
const { Meta } = Card;
const Inicio: React.FC = () => {
  return (
    <div>
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl9su24gdGNlP0Dh4CtT5G4f8KsijhjET9cOymhV8XKg&s" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>

    </div>
  )
}

export default Inicio;