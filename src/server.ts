import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  await mongoose.connect(config.database_url as string);
}

app.listen(config.port, () => {
  console.log(`app listening on port ${config.port}`);
});
