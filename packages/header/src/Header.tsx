import { CoreProvider } from '@ag.ds-next/core';
import { Header as AgDsHeader } from '@ag.ds-next/header';
import { LoadingDots } from '@ag.ds-next/loading';
import { AvatarIcon } from '@ag.ds-next/icon';
import { MainNav, MainNavButton } from '@ag.ds-next/main-nav';
import { Logo } from '@ag.ds-next/ag-branding';
import React, { useState } from 'react';

export type HeaderProps = {
	authenticated?: boolean;
	activePath?: string;
	handleSignIn?: React.MouseEventHandler<HTMLButtonElement>;
	handleSignOut?: React.MouseEventHandler<HTMLButtonElement>;
};

const authenticatedLinks = [
	{
		href: '/account',
		label: 'Home',
	},
	{
		href: '/establishments',
		label: 'Establishments',
	},
	{
		href: '/intelligence',
		label: 'Data and insights',
	},
	{
		href: '/compliance',
		label: 'Compliance',
	},
];

export const Header = ({
	authenticated,
	activePath,
	handleSignIn,
	handleSignOut,
}: HeaderProps) => {
	const [pending, setPending] = useState(false);

	const handleEvent =
		(handler?: React.MouseEventHandler<HTMLButtonElement>) =>
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			setPending(true);
			await handler?.(e);
			setPending(false);
		};

	const buttonContent = (label: string) =>
		pending ? <LoadingDots size="sm" role="status" /> : label;

	return (
		<CoreProvider>
			<AgDsHeader
				href={authenticated ? '/account' : '/'}
				heading="Export Service"
				subline="Supporting Australian agricultural exports"
				logo={<Logo />}
				variant="dark"
				badgeLabel="beta"
			/>
			<MainNav
				variant="agriculture"
				links={authenticated ? authenticatedLinks : []}
				activePath={activePath}
				rightContent={
					authenticated ? (
						<MainNavButton
							onClick={handleEvent(handleSignOut)}
							label={buttonContent('Sign out')}
							icon={AvatarIcon}
						/>
					) : (
						<MainNavButton
							onClick={handleEvent(handleSignIn)}
							label={buttonContent('Sign in')}
							icon={AvatarIcon}
						/>
					)
				}
			/>
		</CoreProvider>
	);
};
