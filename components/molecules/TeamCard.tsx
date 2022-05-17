import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faInstagram, faReddit, faTelegram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { VText } from '../atoms/VText';
import { Card, ICardProps } from './Card';
import { classNames } from '@/common/helpers';

export interface ITeamCardProps extends ICardProps {
  role?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  instagram?: string;
  github?: string;
}

export const TeamCard: React.FC<ITeamCardProps> = ({bordered=true, role, discord, twitter, telegram, instagram, title, subtitle, url, avatar}) => {
  return <Card center roundImage sameType={true} bordered={bordered}
  footer={
    <div className='flex flex-col justify-center items-center space-y-3'>
      <VText size='sm'>Role - {role}</VText>
      <div className={classNames('flex space-x-6')}>
      { discord && <a href={discord} target='_blank' className="text-accent-dark-200 hover:text-indigo-700">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
      }
      {telegram &&<a href={telegram} target='_blank' className="text-accent-dark-200 hover:text-indigo-700">
        <FontAwesomeIcon size='lg' icon={faTelegram} />
      </a>}
      {instagram && <a href={instagram} target='_blank'
        className="text-accent-dark-200 hover:text-indigo-700">
        <FontAwesomeIcon size='lg' icon={faInstagram} />
      </a> }
      {twitter &&
      <a href={twitter} target='_blank' className="text-accent-dark-200 hover:text-indigo-700">
        <FontAwesomeIcon size='lg' icon={faTwitter} />
      </a>
      }
      </div>
    </div>
  }
  title={title} subtitle={subtitle} image={avatar} long={false} wide={false}></Card>
}