from sqlalchemy import Column, Integer, String, Float
from app.core.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)

    farmer_id = Column(Integer, index=True)

    # ⚠️ MySQL requires length for String (VARCHAR)
    image_name = Column(String(255))

    plant_name = Column(String(100))

    disease_name = Column(String(100), nullable=True)

    status = Column(String(50))

    confidence = Column(Float)

    class_id = Column(String(50))