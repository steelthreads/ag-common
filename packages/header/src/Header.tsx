import { CoreProvider } from '@ag.ds-next/core';
import { Header as AgDsHeader } from '@ag.ds-next/header';
import { AvatarIcon } from '@ag.ds-next/icon';
import { MainNav, MainNavButton } from '@ag.ds-next/main-nav';
import { Logo } from '@ag.ds-next/ag-branding';

export type HeaderProps = {
	authenticated?: boolean;
	activePath?: string;
	handleSignIn?: React.MouseEventHandler<HTMLButtonElement>;
	handleSignOut?: React.MouseEventHandler<HTMLButtonElement>;
	handleSignOutx?: React.MouseEventHandler<HTMLButtonElement>;
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
	handleSignOutx,
}: HeaderProps) => {
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
						<>
							<MainNavButton
								onClick={(e) => handleSignOutx?.(e)}
								label="Sign out"
								icon={AvatarIcon}
							/>
							<MainNavButton
								onClick={(e) => handleSignOutx?.(e)}
								label={<>Yeah</>}
								icon={AvatarIcon}
							/>
						</>
					) : (
						<MainNavButton
							onClick={handleSignIn}
							label="Sign in"
							icon={AvatarIcon}
						/>
					)
				}
			/>
		</CoreProvider>
	);
};
