# Great Redemption Ministries Website

Welcome to the repository for the Great Redemption Ministries' website, accessible at [grmatl.org](https://grmatl.org). This site is a central hub for the church, providing information, resources, and live stream links to service streams on Youtube and Facebook.

## Domain Management

The domain for this site, grmatl.org, is currently purchased and managed through Squarespace, having been transferred from Google Domains.

## Deployment

This website is deployed via [Netlify](https://www.netlify.com/), enabling continuous deployment directly from this GitHub repository. Each push to the main branch triggers a new deployment, ensuring that the latest changes are always live.

### Netlify Build Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/32201475-7055-4e11-8f1a-a366bb93a6c6/deploy-status)](https://app.netlify.com/sites/ecstatic-ramanujan-f17c62/deploys)

## Automation with GitHub Actions

This repository uses GitHub Actions to automate several routine tasks:

- **Live Stream URL Updates**: The `Live.html` file is automatically updated with the latest YouTube live stream URL based on a scheduled trigger every Sunday.

- **Manual Trigger**: The workflow can also be triggered manually via the GitHub Actions interface, allowing for immediate updates when needed outside of the regular schedule.

## Contributing

Contributions to this repository are welcome, especially from community members of Great Redemption Ministries. If you'd like to contribute, please fork the repository and submit a pull request.

For any issues or feature requests, please open an issue in this repository, and we will address it as promptly as possible.

## Contact

For more information about the website or to report any problems, please contact [grmmedia16@gmail.com](mailto:grmmedia16@gmail.com).

Thank you for visiting our site and supporting our Church!

---

For developers looking to make updates or learn about our deployment processes, please refer to the specific files and workflows within this repository for detailed guidance.
