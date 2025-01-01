from sqlalchemy import Column, Integer, String, DECIMAL
from database import Base

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255))
    price = Column(DECIMAL(10, 2), nullable=False)
    image = Column(String(255))