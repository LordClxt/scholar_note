"""add credit column of module table

Revision ID: d220734be424
Revises: 
Create Date: 2025-02-21 00:31:03.738081

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd220734be424'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


async def upgrade() -> None:
    await op.add_column('modules', sa.Column('credit', sa.Integer, nullable=True))


def downgrade() -> None:
    pass
