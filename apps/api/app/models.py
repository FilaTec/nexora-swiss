from datetime import datetime
from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from .db import Base

class CVProfile(Base):
    __tablename__="cv_profiles"
    id: Mapped[int]=mapped_column(Integer,primary_key=True)
    cv_title: Mapped[str]=mapped_column(String(160),default="My CV")
    template: Mapped[str]=mapped_column(String(40),default="classic")
    first_name: Mapped[str]=mapped_column(String(120))
    last_name: Mapped[str]=mapped_column(String(120))
    email: Mapped[str]=mapped_column(String(255),default="")
    phone: Mapped[str]=mapped_column(String(80),default="")
    city: Mapped[str]=mapped_column(String(160),default="")
    address: Mapped[str]=mapped_column(String(255),default="")
    linkedin: Mapped[str]=mapped_column(String(255),default="")
    profession: Mapped[str]=mapped_column(String(200),default="")
    summary: Mapped[str]=mapped_column(Text,default="")
    experience: Mapped[str]=mapped_column(Text,default="")
    education: Mapped[str]=mapped_column(Text,default="")
    skills: Mapped[str]=mapped_column(Text,default="")
    languages: Mapped[str]=mapped_column(Text,default="")
    certifications: Mapped[str]=mapped_column(Text,default="")
    updated_at: Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow,onupdate=datetime.utcnow)
    created_at: Mapped[datetime]=mapped_column(DateTime,default=datetime.utcnow)
