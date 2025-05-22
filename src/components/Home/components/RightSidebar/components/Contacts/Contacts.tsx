import React from 'react';
import { Dots, NewRoom, Search } from '../../../../../../svg';
import Contact from '../Contact/Contact';
import { block } from '../../../../../../helpers/bem.helpers';
import { User } from '../../../../../../types';
import './Contacts.scss';

const b = block('Contacts');

const IconCircle = ({
  IconComponent,
  color,
}: {
  IconComponent: React.FC<{ color: string }>;
  color: string;
}) => (
  <div className={`${b('circle')} hover`}>
    <IconComponent color={color} />
  </div>
);

interface ContactsProps {
  user: User;
}

export const Contacts = ({ user }: ContactsProps) => {
  const color = '#65676b';
  return (
    <div className={b()}>
      <div className={b('header')}>
        <div className={b('header-left')}>Contacts</div>
        <div className={b('header-right')}>
          <IconCircle IconComponent={NewRoom} color={color} />
          <IconCircle IconComponent={Search} color={color} />
          <IconCircle IconComponent={Dots} color={color} />
        </div>
      </div>
      <div className={b('list')}>
        <Contact user={user} />
      </div>
    </div>
  );
};
